import { configureStore } from "@reduxjs/toolkit";
import notesReducer from './reducers/notes.slice'
import noteReducer from './reducers/note.slice'

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    note: noteReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch