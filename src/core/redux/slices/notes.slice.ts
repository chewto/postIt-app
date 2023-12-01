import { Note } from '../../interfaces/note.interface';
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
    },
    updateTitleList: (state, action:PayloadAction <Note>) => {
      const {id} = action.payload

      const index = state.findIndex((note) => note.id === id);

      if(index !== -1) {
        state[index] = action.payload
      }
    },
    deleteNote: (state, action:PayloadAction<string>) => {
      const id = action.payload

      const noteIndex = state.findIndex((note) => note.id === id)

      if(noteIndex !== -1) {
        state.splice(noteIndex, 1)
      }
    }
  }
})

export const {setNotes, addNote, updateTitleList, deleteNote} = NotesSlice.actions

export default NotesSlice.reducer