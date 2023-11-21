import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../../interfaces/note.interface';

const initialState: Note[] = []

export const TabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    addTab: (state, action: PayloadAction<Note>) => {
      state.push(action.payload)
    },
    deleteTab: (state, action: PayloadAction<Note[]>) => {
      return action.payload
    }
  }
})

export const {addTab , deleteTab} = TabsSlice.actions

export default TabsSlice.reducer