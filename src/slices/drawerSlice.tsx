
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface DrawerState {
  isOpen: boolean
}

const initialState: DrawerState = {
  isOpen: true
}

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    setDrawerOpen: (state, action: PayloadAction<void>) => {
      state.isOpen = true
    },
    setDrawerClosed: (state, action: PayloadAction<void>) => {
      state.isOpen = false
    },
  },
})

export const { setDrawerOpen, setDrawerClosed} = drawerSlice.actions
export const isDrawerOpen = (state: RootState) => state.drawer.isOpen 
export default drawerSlice.reducer