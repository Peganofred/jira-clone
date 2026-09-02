import { createSlice } from '@reduxjs/toolkit'
import { initialMembers } from '../../data/mockData'

const initialState = {
  items: initialMembers,
  loading: false,
}

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    addMember: (state, action) => {
      state.items.push(action.payload)
    },
    removeMember: (state, action) => {
      state.items = state.items.filter((m) => m.id !== action.payload)
    },
  },
})

export const { addMember, removeMember } = membersSlice.actions
export default membersSlice.reducer
