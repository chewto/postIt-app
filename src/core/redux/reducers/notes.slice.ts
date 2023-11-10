import { Note } from './../../interfaces/note.interface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState:Note[]= []

export const NotesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers:{
    setNotes: (state, action:PayloadAction<Note[]>) => {
      return action.payload
    },
    addNote: (state, action:PayloadAction <Note>) => {
      state.push(action.payload)
    }
  }
})

export const {setNotes, addNote} = NotesSlice.actions

export default NotesSlice.reducer