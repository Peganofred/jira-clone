import { createSlice } from '@reduxjs/toolkit'
import { initialTasks } from '../../data/mockData'

const initialState = {
  items: initialTasks,
  loading: false,
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.items.push(action.payload)
    },
    removeTask: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload)
    },
    updateTask: (state, action) => {
      const index = state.items.findIndex((t) => t.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload }
      }
    },
  },
})

export const { addTask, removeTask, updateTask } = tasksSlice.actions
export default tasksSlice.reducer
