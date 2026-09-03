import { createSlice } from '@reduxjs/toolkit'
import { initialProjects } from '../../data/mockData'

const initialState = {
  items: initialProjects,
  loading: false,
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.items.push(action.payload)
    },
    removeProject: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload)
    },
    updateProject: (state, action) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload }
      }
    },
  },
})

export const { addProject, removeProject, updateProject } = projectsSlice.actions
export default projectsSlice.reducer
