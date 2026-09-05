import { createSlice } from '@reduxjs/toolkit'
import { initialNotifications } from '../../data/mockData'

const initialState = {
  items: initialNotifications,
  loading: false,
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.items.unshift(action.payload)
    },
    markAsRead: (state, action) => {
      const notif = state.items.find((n) => n.id === action.payload)
      if (notif) notif.read = true
    },
    markAllAsRead: (state) => {
      state.items.forEach((n) => {
        n.read = true
      })
    },
    removeNotification: (state, action) => {
      state.items = state.items.filter((n) => n.id !== action.payload)
    },
    clearAll: (state) => {
      state.items = []
    },
  },
})

export const { addNotification, markAsRead, markAllAsRead, removeNotification, clearAll } =
  notificationsSlice.actions
export default notificationsSlice.reducer