import { useState } from 'react'

const ROLES = ['Developer', 'Designer', 'Tester', 'Product Manager', 'DevOps', 'Other']

// 📖 Avatar color sirf 6 options mein se choose hoga (static Tailwind classes)
const AVATAR_COLORS = ['bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-orange-500', 'bg-red-500', 'bg-teal-500']

function MemberForm({ initialMember, onSubmit, onCancel }) {
  const [name, setName] = useState(initialMember?.name || '')
  const [role, setRole] = useState(initialMember?.role || 'Developer')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    // 📖 Random avatar color pick karna
    const randomColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]
    onSubmit({
      name: name.trim(),
      role,
      avatarColor: initialMember?.avatarColor || randomColor,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">Member Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Neha Singh"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium mb-1 text-gray-700">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          {initialMember ? 'Save Changes' : 'Add Member'}
        </button>
      </div>
    </form>
  )
}

export default MemberForm
