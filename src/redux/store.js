import { configureStore } from '@reduxjs/toolkit'
import projectsReducer from './slices/projectsSlice'
import tasksReducer from './slices/tasksSlice'
import membersReducer from './slices/membersSlice'

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    members: membersReducer,
  },
})
