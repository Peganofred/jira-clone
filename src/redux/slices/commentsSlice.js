import { createSlice } from '@reduxjs/toolkit'
import { initialComments } from '../../data/mockData'

const initialState = {
  items: initialComments,
  loading: false,
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.items.push(action.payload)
    },
    removeComment: (state, action) => {
      state.items = state.items.filter((c) => c.id !== action.payload)
    },
  },
})

export const { addComment, removeComment } = commentsSlice.actions
export default commentsSlice.reducer