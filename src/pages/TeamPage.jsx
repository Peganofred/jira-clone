import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addMember, removeMember } from '../redux/slices/membersSlice'
import Modal from '../components/ui/Modal'
import MemberForm from '../components/MemberForm'

function TeamPage() {
  const members = useSelector((state) => state.members.items)
  const tasks = useSelector((state) => state.tasks.items)
  const dispatch = useDispatch()

  const [modalOpen, setModalOpen] = useState(false)
  const [deletingMember, setDeletingMember] = useState(null)

  // 📖 Har member ke assigned tasks count karne ke liye
  const getTaskCount = (memberId) =>
    tasks.filter((t) => t.assignee === memberId).length

  const handleCreate = (formData) => {
    dispatch(addMember({ id: crypto.randomUUID(), ...formData }))
    setModalOpen(false)
  }

  const handleDelete = () => {
    dispatch(removeMember(deletingMember.id))
    setDeletingMember(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Team Members</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          + Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
            {/* Avatar circle with first letter */}
            <div className={`w-12 h-12 rounded-full ${member.avatarColor} text-white flex items-center justify-center font-bold text-lg flex-shrink-0`}>
              {member.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{member.name}</h3>
              <p className="text-xs text-gray-500">{member.role}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {getTaskCount(member.id)} task{getTaskCount(member.id) !== 1 && 's'} assigned
              </p>
            </div>
            <button
              onClick={() => setDeletingMember(member)}
              className="text-xs px-2 py-1 border border-red-200 text-red-600 rounded hover:bg-red-50 flex-shrink-0"
              title="Remove"
            >
              🗑️
            </button>
          </div>
        ))}
        {members.length === 0 && (
          <p className="text-gray-400 col-span-full text-center py-8">No members yet.</p>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Member">
        <MemberForm
          onSubmit={handleCreate}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!deletingMember}
        onClose={() => setDeletingMember(null)}
        title="Remove Member"
      >
        <p className="text-sm text-gray-600 mb-5">
          Kya aap <span className="font-semibold">{deletingMember?.name}</span> ko remove karna chahte hain?
          {Number(getTaskCount(deletingMember?.id)) > 0 && (
            <span className="block mt-1 text-orange-600">
              ⚠️ Is member ko {getTaskCount(deletingMember?.id)} task(s) assigned hain.
            </span>
          )}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setDeletingMember(null)}
            className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default TeamPage
