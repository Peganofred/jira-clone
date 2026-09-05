import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchTerm: '',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
  },
})

export const { setSearchTerm } = uiSlice.actions
export default uiSlice.reducer
