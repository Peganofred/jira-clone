import { configureStore } from '@reduxjs/toolkit'
import projectsReducer from './slices/projectsSlice'
import tasksReducer from './slices/tasksSlice'
import membersReducer from './slices/membersSlice'
import commentsReducer from './slices/commentsSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    members: membersReducer,
    comments: commentsReducer,
    ui: uiReducer,
  },
})
